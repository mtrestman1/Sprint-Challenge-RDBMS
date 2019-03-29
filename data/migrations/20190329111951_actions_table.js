
exports.up = function(knex) {
  return knex.schema.createTable('actions', tbl => {
      tbl.increments()

      tbl
      .string('description', 256)
      .string('notes', 256)
      .notNullable()
      .unique()

      tbl
      .integer('project_id')
      .unsigned()
      .references('id')
      .inTable('projects')
      .onDelete('CASCADE')
      .onUpdate('CASCADE')
  })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('actions')
};
