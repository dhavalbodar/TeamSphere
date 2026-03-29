const Organization =  require("../organization/organization.model");
const User = require("../user/user.model");

const findUserByEmailRepo = async (email, session) => {
    try {
        return await User.findOne({ email }).session(session);
        
    } catch (error) {
        console.log(error)
    }
}

const createOrganizationRepo = async (payload, session) => {
    const [organization] = await Organization.create([payload], { session });
    return organization;
}

const createUserRepo = async (payload, session) => {
    const [user] = await User.create([payload], {session});
    return user;
}

const updateOrganizationRepo = async (organizationId, updateData, session) => {
    const organization = await Organization.findByIdAndUpdate(
        organizationId,
        { $set: updateData },
        { new: true, session }
    );
    return organization;
}

module.exports = {
    findUserByEmailRepo,
    createOrganizationRepo,
    createUserRepo,
    updateOrganizationRepo
}