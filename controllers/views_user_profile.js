const views_private = {
    user_profile: (req, res) =>{
        return res.render('user_profile');
    },
    user_information: (req, res) =>{
        return res.render('user_information');
    }
};
module.exports = views_private;