
exports.up = function(knex) {
  return knex.schema.createTable('actions', tbl => {
      tbl.increments()

      tbl
      tbl.string('description', 256).notNullable();
      tbl.string('notes', 256).notNullable()
      tbl.boolean('completed')

      tbl
      .integer('project_id')
      .references('id')
      .inTable('projects')
      .onDelete('CASCADE')
      .onUpdate('CASCADE')
  })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('actions')
};
