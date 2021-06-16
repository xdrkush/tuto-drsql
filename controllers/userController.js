/*
 * Import Module
 ****************/
const { sql } = require('drsql')

/*
 * Controller
 *************/

// Method Get
exports.get = async (req, res) => {
    console.log('Controller GET USER: ')

    // On recherche tout les users avec tout les attributs
    await sql.selectAll('users').then(data => {
        // On renvoie la réponse
        res.json({
            status: 200,
            listUser: data,
            message: "users lists retrieved successfully"
        })
    }).catch(err => console.log(err))
}

// Method GetID
exports.getID = async (req, res) => {
    // On recherche dans la table 'users' via l'id passer en params de l'url
    await sql.selectAllById('users', req.params.id).then(data => {
        // On renvoie la réponse
        res.json({
            status: 200,
            user: data,
            message: "users lists retrieved successfully"
        })
    }).catch(err => console.log(err))
}

// Method GetByKey
exports.getByKey = async (req, res) => {
    await sql.selectAllByKey('users', req.params).then(data => {
        // On renvoie la réponse
        res.json({
            status: 200,
            user: data,
            message: "users lists retrieved successfully"
        })
    }).catch(err => console.log(err))
}

// Method Post
exports.post = async (req, res) => {
    console.log('Controller POST USER: ', req.body)

    // SQL pour creer un users
    // values = (name, email, mobile)
    // {
    //     name: 'Bruno',
    //     email: 'bru@no.fr',
    //     mobile: '0606060610' 
    // }
    await sql.insertInto('users', { ...req.body }).then(async () => {
        // On recherche tout les users
        await sql.selectAll('users').then(data => {
            // On renvoie la réponse
            res.json({
                status: 200,
                listUser: data,
                message: "Add Users successfully"
            })
        })
    }).catch(err => console.log(err))
}

// Method Edit One User
exports.editOne = async (req, res) => {
    console.log('Controller EditOne USER: ', req.body)

    // SQL pour update un user
    // sql = ('table', values, id)
    // values = (name, email, mobile)
    // {
    //     name: 'Bruno',
    //     email: 'bru@no.fr',
    //     mobile: '0606060610' 
    // }
    await sql.updateOne('users', { ...req.body }, req.params.id).then(() => {
        // On recherche tout les users
        sql.selectAll('users').then(data => {
            // On renvoie la réponse
            res.json({
                status: 200,
                listUser: data,
                message: "Update Users successfully"
            })
        })
    }).catch(err => console.log(err))
}

// Method Delete One
exports.deleteOne = async (req, res) => {
    console.log('Controller DeleteOne USER: ', req.params.id)

    // On supprime un users par son id
    await sql.deleteByID('users', req.params.id).then(() => {
        // On recherche tout les users
        sql.selectAll('users').then(data => {
            // On renvoie la réponse
            res.json({
                status: 200,
                listUser: data,
                message: "Delete Users successfully"
            })
        })
    })
}

// Method Delete All
exports.deleteAll = async (req, res) => {
    console.log('Controller DeleteAll USER: ', req.params.id)

    // Supprimer tout dans la table 'users'
    await sql.deleteAll('users').then(() => {
        // On recherche tout les users
        sql.selectAll('users').then(data => {
            // On renvoie la réponse
            res.json({
                status: 200,
                listUser: data,
                message: "Delete All Users successfully"
            })
        })
    })
}