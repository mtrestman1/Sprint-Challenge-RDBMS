
exports.up = function(knex) {
  return knex.schema.createTable('projects', tbl => {
      tbl.increments()

      tbl
      tbl.string('name', 128).notNullable()
      tbl.string('description', 256).notNullable()
      tbl.boolean('completed')
     
  })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('projects')
};
