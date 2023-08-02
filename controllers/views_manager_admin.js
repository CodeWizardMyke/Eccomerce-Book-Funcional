const views_manager_admin = {
    index: (req, res) => {
        res.render('admin_sales_graphics');
    },
    createProd: (req, res) =>{
        res.render('admin_prodCreate');
    },
    searchProd: (req, res) =>{
        res.render('admin_prodSearch');
    },
    putProd: (req, res) =>{
        res.render('admin_prodShow');
    },
    showProd: (req, res) =>{
        res.render('admin_prodShow');
    },
    createUser: (req, res) =>{
        res.render('admin_userCreate');
    },
    searchUser: (req, res) =>{
        res.render('admin_userSearch');
    },
    showUser: (req, res) =>{
        res.render('admin_userShow');
    },
    salesGet:(req, res) =>{
        res.render('admin_sales_graphics');
    },
    salesSearch:(req, res) =>{
        res.render('admin_sales_search');
    },
    salesShow:(req, res) =>{
        res.render('admin_sales_show');
    },
    feedbacks :(req, res ) => {
        res.render('admin_feedbacks');
    },
    feedback_show :(req, res ) => {
        res.render('admin_feedbacks_show');
    },
};

module.exports = views_manager_admin;