const express = require('express');
const knex = require('knex');
const router = express.Router()

const db = require('../data/dbConfig.js');

router.get('/api/projects', (req, res) => {
    db('projects')
    .then(projects => {
        res.status(200).json(projects)
    })
    .catch(error => {
        res.status(500).json(error)
    })
})

router.get('/api/projects/:id', (req, res) => {
    const { id } = req.params;
    db('projects')
    .where({id})
    .first()
    .then(project => {
        db('actions').where({project_id: id})
        .first() //get rid of []
        .then(action => {
         project.action = action
            res.status(200).json(project)
    })
})
    .catch(error => {
        res.status(500).json({message: `there was an error retrieving the data - ${error}`})
    })
})

router.post('/api/projects', (req, res) => {
    const { name, description } = req.body;
    if(!name || !description) {
        return res.status(400).json({ message: 'Please provide a name and description'})
    } else {
        return db('projects').insert(req.body)
        .then(ids => {
            const id = ids[0];
            db('projects')
            .where({id})
            .then(projects => {
                res.status(201).json(projects)
            })
        })
        .catch(error => {
            res.status(500).json({message: `There was an error adding this to the db - ${error} `})
        })
    }
})

router.post('/api/actions', (req, res) => {
    const { description, notes, project_id } = req.body;
    if(!description || !notes || !project_id ) {
        return res.status(400).json({message: 'Please provide a description, additional notes, and projectID'})
    } else {
        return db('actions').insert(req.body)
            .then(actions => {
                res.status(201).json(actions)
            })
        
        .catch(error => {
            res.status(500).json({message: `There was an error adding this to the db ${error}`})
        })
    }
})

module.exports = router;