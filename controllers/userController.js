/*
 * Import Module
 ****************/
const { sql } = require('drsql')

/*
 * Controller
 *************/

// Method Get
exports.getAll = async (req, res) => {
    console.log('Controller GET USER: ')

    // On renvoie la réponse
    res.json({
        status: 200,
        // On recherche tout les users avec tout les attributs
        listUser: await sql.selectAll('users'),
        message: "users lists retrieved successfully"
    })
}

// Method GetID
exports.getID = async (req, res) => {
    console.log('Controller GET USER ID: ')

    // On renvoie la réponse
    res.json({
        status: 200,
        // On recherche dans la table 'users' via l'id passer en params de l'url
        user: await sql.selectAllById('users', req.params.id),
        message: "users lists retrieved successfully"
    })
}

// Method GetByKey
exports.getByKey = async (req, res) => {
    console.log('Controller GET USER By KEY: ')

    // On renvoie la réponse
    res.json({
        status: 200,
        // On recherche dans la table 'users' via l'id passer en params de l'url
        user: await sql.selectAllByKey('users', req.params),
        message: "users lists retrieved successfully"
    })
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
    await sql.insertInto('users', { ...req.body })

    // On renvoie la réponse
    res.json({
        status: 200,
        listUser: await sql.selectAll('users'),
        message: "Add Users successfully"
    })
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
    await sql.updateOne('users', { ...req.body }, req.params.id)

    // On renvoie la réponse
    res.json({
        status: 200,
        listUser: await sql.selectAll('users'),
        message: "Update Users successfully"
    })
}

// Method Delete One
exports.deleteOne = async (req, res) => {
    console.log('Controller DeleteOne USER: ', req.params.id)

    // On supprime un users par son id
    await sql.deleteByID('users', req.params.id)
    // On renvoie la réponse
    res.json({
        status: 200,
        listUser: await sql.selectAll('users'),
        message: "Delete Users successfully"
    })
}

// Method Delete All
exports.deleteAll = async (req, res) => {
    console.log('Controller DeleteAll USER: ', req.params.id)

    // Supprimer tout dans la table 'users'
    await sql.deleteAll('users')

    // On renvoie la réponse
    res.json({
        status: 200,
        listUser: await sql.selectAll('users'),
        message: "Delete All Users successfully"
    })
}