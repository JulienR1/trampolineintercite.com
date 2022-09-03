export interface MigrationHistory {
  currentMigration: Migration;
  migrations: Migration[];
  databases: { [key: Environment]: number };
}

export type Migration = Filename[];
export type Filename = string;
export type Environment = string;
