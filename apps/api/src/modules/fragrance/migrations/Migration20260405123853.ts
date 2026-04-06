import { Migration } from "@medusajs/framework/mikro-orm/migrations";

export class Migration20260405123853 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`alter table if exists "fragrance_data" drop constraint if exists "fragrance_data_product_id_unique";`);
    this.addSql(`create table if not exists "fragrance_data" ("id" text not null, "product_id" text not null, "top_notes" jsonb not null default '[]', "heart_notes" jsonb not null default '[]', "base_notes" jsonb not null default '[]', "accords" jsonb not null default '[]', "family" text check ("family" in ('Fresh', 'Floral', 'Amber', 'Woody')) not null, "sub_family" text null, "concentration" text check ("concentration" in ('EDC', 'EDT', 'EDP', 'Parfum', 'Extrait')) not null, "longevity" real null, "sillage" real null, "projection" real null, "gender" text check ("gender" in ('Masculine', 'Feminine', 'Unisex')) not null default 'Unisex', "season" jsonb not null default '[]', "occasion" jsonb not null default '[]', "created_at" timestamptz not null default now(), "updated_at" timestamptz not null default now(), "deleted_at" timestamptz null, constraint "fragrance_data_pkey" primary key ("id"));`);
    this.addSql(`CREATE UNIQUE INDEX IF NOT EXISTS "IDX_fragrance_data_product_id_unique" ON "fragrance_data" ("product_id") WHERE deleted_at IS NULL;`);
    this.addSql(`CREATE INDEX IF NOT EXISTS "IDX_fragrance_data_deleted_at" ON "fragrance_data" ("deleted_at") WHERE deleted_at IS NULL;`);
  }

  override async down(): Promise<void> {
    this.addSql(`drop table if exists "fragrance_data" cascade;`);
  }

}
