const {check} = require('express-validator')
const path = require('path')


const check_fields = {
    login : [
        check('email').notEmpty().withMessage('o campo email não pode estar vazio'),
        check('password').notEmpty().withMessage('o campo senha não pode estar vazio')
    ],
    singUp:[
        
        check('username')
            .notEmpty().withMessage('o campo nome não pode estar vazio').bail()
            .isLength({min:6}).withMessage('o campo de nome deve conter ao menos 6 caracteres').bail()
            .trim(),

        check('email')
            .notEmpty().withMessage('o campo email não pode estar vazio').bail()
            .trim().bail()
            .normalizeEmail().bail()
            .isEmail().withMessage('formato de email inválido, por favor insira um email correto'),
        
        check('re_email')
            .notEmpty().withMessage('confirmação de email não pode estar vazio').bail()
            .trim().bail()
            .normalizeEmail().bail()
            .isEmail().withMessage('formato de email inválido, por favor insira um email correto').bail()
            .custom((value, {req} ) => {
                let {email,re_email} = req.body
                    if(email !== re_email){
                        throw new Error(`os emails informados são diferentes`)
                    }
                    return true
            }),

        check('password')
            .notEmpty().withMessage('o campo senha não pode estar vazio').bail()
            .trim().bail()
            .isLength({min:8}).withMessage('o numero mínimo de cumprimento da senha são de 8 caracteres'),

        check('re_password')
            .notEmpty().withMessage('confirmação de senha não pode estar vazio').bail()
            .isLength({min:8}).withMessage('o numero mínimo de cumprimento da senha são de 8 caracteres').bail()
            .custom((value, {req} ) => {
                let {password,re_password} = req.body
                    if(password !== re_password){
                        throw new Error(`as senhas informados são diferentes`)
                    }
                    return true
            }),

        check('avatar').custom((value, {req}) =>{
            let file = req.file;
            let acceptedExtensions = ['.jpg','.png','.gif'];

            if(file){
                let fileExtensions = path.extname(file.originalname);

                if(!acceptedExtensions.includes(fileExtensions)){
                    throw new Error(`As extensões de arquivo permitidos são ${acceptedExtensions.join(', ')}`)
                }
                return true;
            }
            return true;
        })
    ],
    Book_fields:[
        check('title').notEmpty().withMessage('*Informe o titulo do produto').bail(),
        check('author').notEmpty().withMessage('*Informe o autor do produto').bail()
        .isLength({max:80}).withMessage('*Nome do autor muito longo').bail()
            .trim().bail(),

        check('publishing_company').notEmpty().withMessage('*Informe a editora do produto').bail()
            .isLength({max:80}).withMessage('*Este campo execeu o limite máximo de caracteres permitidos').bail()
            .trim().bail(),

        check('edition').notEmpty().withMessage('*Informe qual é a edição do produto').bail()
            .trim().bail(),

        check('synopsis').notEmpty().withMessage('*Insira a sinopse do produto').bail()
            .trim().bail(),

        check('genre').notEmpty().withMessage('*Informe o genero do produto').bail()
            .isLength({max:120}).withMessage('*esperado um genero válido').bail()
            .trim().bail(), 

        check('kindle_price').notEmpty().withMessage('*Insira um valor para este produto').bail()
            .trim().bail(),  

        check('publication_date').notEmpty().withMessage('*Informe a data de publicação do produto').bail()
            .trim().bail(), 

        check('language').notEmpty().withMessage('*Informe o idioma do produto').bail()
            .trim().bail(),  

        check('inventory').notEmpty().withMessage('*Informe quantas unidades estarão disponíveis para venda').bail()
            .isLength({min:1}).withMessage('é esperado ao menos uma unidade deste produto').bail()
            .trim().bail(), 

        check('number_pages').notEmpty().withMessage('*Informe a quantidade de paginas deste produto').bail()
            .trim().bail(),  

        check('front_cover').custom((value, {req}) =>{
            let file = req.file;
            let acceptedExtensions = ['.jpg','.png','.gif'];

            if(!file){
                throw new Error(`precisa de selecionar um arquivo`)
            }else{
                let fileExtensions = path.extname(file.originalname);

                if(!acceptedExtensions.includes(fileExtensions)){
                    throw new Error(`As extensões de arquivo permitidos são ${acceptedExtensions.join(', ')}`)
                }
            return true;
            }
        })

    ],
    Info_fields:[
        check('full_name').notEmpty().withMessage('*o campo não pode estar vazio! ').bail(),

        check('email').notEmpty().withMessage('*o campo não pode estar vazio! ').bail()
            .trim().bail()
            .normalizeEmail().bail()
            .isEmail().withMessage('formato de email inválido, por favor insira um email correto'),
            
        check('telephone').notEmpty().withMessage('*o campo não pode estar vazio! ').bail()
            .isLength({min:11}).withMessage('informe um número de telefone válido'),

        check('birth_date').notEmpty().withMessage('*o campo não pode estar vazio! ').bail(),

        check('user_rg').notEmpty().withMessage('*o campo não pode estar vazio! ').bail(),

        check('user_cpf').notEmpty().withMessage('*o campo não pode estar vazio! ').bail(),

        check('number').notEmpty().withMessage('*o campo não pode estar vazio! ').bail(),
        
        check('cep').notEmpty().withMessage('*o campo não pode estar vazio! ').bail(),

        check('state').notEmpty().withMessage('*o campo não pode estar vazio! ').bail(),

        check('city').notEmpty().withMessage('*o campo não pode estar vazio! ').bail(),

        check('district').notEmpty().withMessage('*o campo não pode estar vazio! ').bail(),

        check('road').notEmpty().withMessage('*o campo não pode estar vazio! ').bail(),

        check('complements').notEmpty().withMessage('*o campo não pode estar vazio! ').bail(),
    ],
    User_modify:[
        check('username')
            .notEmpty().withMessage('o campo nome não pode estar vazio').bail()
            .isLength({min:6}).withMessage('o campo de nome deve conter ao menos 6 caracteres').bail()
            .trim(),

        check('email')
            .notEmpty().withMessage('o campo email não pode estar vazio').bail()
            .trim().bail()
            .normalizeEmail().bail()
            .isEmail().withMessage('formato de email inválido, por favor insira um email correto'),
        
        check('re_email')
            .notEmpty().withMessage('confirmação de email não pode estar vazio').bail()
            .trim().bail()
            .normalizeEmail().bail()
            .isEmail().withMessage('formato de email inválido, por favor insira um email correto').bail()
            .custom((value, {req} ) => {
                let {email,re_email} = req.body
                    if(email !== re_email){
                        throw new Error(`os emails informados são diferentes`)
                    }
                    return true
            }),

        check('password')
            .notEmpty().withMessage('o campo senha não pode estar vazio').bail()
            .trim().bail()
            .isLength({min:8}).withMessage('o numero mínimo de cumprimento da senha são de 8 caracteres'),

        check('re_password')
            .notEmpty().withMessage('confirmação de senha não pode estar vazio').bail()
            .isLength({min:8}).withMessage('o numero mínimo de cumprimento da senha são de 8 caracteres').bail()
            .custom((value, {req} ) => {
                let {password,re_password} = req.body
                    if(password !== re_password){
                        throw new Error(`as senhas informados são diferentes`)
                    }
                    return true
            }),
    ],
    check_img:[
        check('front_cover').custom((value, {req}) =>{
            let file = req.file;
            let acceptedExtensions = ['.jpg','.png','.gif'];

            if(!file){
                return true;
            }else{
                let fileExtensions = path.extname(file.originalname);

                if(!acceptedExtensions.includes(fileExtensions)){
                    throw new Error(`As extensões de arquivo permitidos são ${acceptedExtensions.join(', ')}`)
                }
            return true;
            }
        })
    ],
    check_avatar:[
        check('user_avatar').custom((value, {req}) =>{
            let file = req.file;
            let acceptedExtensions = ['.jpg','.png','.gif'];

            if(!file){
                return true;
            }else{
                let fileExtensions = path.extname(file.originalname);

                if(!acceptedExtensions.includes(fileExtensions)){
                    throw new Error(`As extensões de arquivo permitidos são ${acceptedExtensions.join(', ')}`)
                }
            return true;
            }
        })
    ]
};

module.exports = check_fields;