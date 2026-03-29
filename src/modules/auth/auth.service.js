const authRepository = require("./auth.repository");
const { findUserByEmailRepo, createOrganizationRepo, createUserRepo, updateOrganizationRepo } = authRepository;

const mongoose =  require("mongoose");
const bcrypt = require("bcrypt");

const signUpService = async (payload) => {
    const session = await mongoose.startSession();
    try {
        session.startTransaction();
        const {
            organizationName,
            organizationDescription,
            firstName,
            lastName,
            email,
            password
        } = payload;

        if (payload.role && payload.role !== "ORG_ADMIN") {
            throw new Error("Invalid role specified. Only ORG_ADMIN can be created during signup.");
        }

        // 1. check existing user
        const existingUser = await findUserByEmailRepo(email, session);
        if (existingUser) {
            throw new Error("Email already registered");
        }

        // 2. hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // 3. create organization
        const organization = await createOrganizationRepo({
            organizationName: organizationName,
            organizationDescription: organizationDescription || "",
            isActive: true,
            createdBy: null,
            updatedBy: null
        }, session);

        // 4. create organization admin user
        const adminUser = await createUserRepo({
            firstName,
            lastName,
            email,
            password: hashedPassword,
            organizationId: organization._id,
            role: "ORG_ADMIN",
            createdBy: null,
            updatedBy: null,
            managerId: null,
            isActive: true
        }, session);

        // 5. update organization with createdBy and updatedBy
        const updatedOrganization = await updateOrganizationRepo(organization._id, {
            createdBy: adminUser._id,
            updatedBy: adminUser._id
        }, session);

        await session.commitTransaction();
        session.endSession();

        return {
            organization: updatedOrganization,
            user: adminUser
        };

    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        throw error;
    }
}

module.exports = {
    signUpService
}