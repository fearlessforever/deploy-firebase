import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
  await knex.schema
    .createTable('items', function (table) {
        table.increments('id');
        table.string('title', 255).notNullable();
        table.text('content').notNullable();

        table.jsonb('data').notNullable().defaultTo({});

        table.integer('created_by').defaultTo(0)
        table.integer('updated_by').defaultTo(0)
        table.timestamp('updated_at' , { useTz: true } ).defaultTo(knex.fn.now());
        table.timestamp('created_at' , { useTz: true } ).defaultTo(knex.fn.now());
    })
}


export async function down(knex: Knex): Promise<void> {
  await knex.schema
      .dropTable("items")
}

