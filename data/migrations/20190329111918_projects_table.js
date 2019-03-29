
exports.up = function(knex) {
  return knex.schema.createTable('projects', tbl => {
      tbl.increments()

      tbl
      .string('name', 128)
      .string('description', 256)
      .boolean('completed')
      .notNullable()
      .unique()
  })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('projects')
};
