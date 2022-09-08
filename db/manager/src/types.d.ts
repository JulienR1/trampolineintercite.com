export interface MigrationHistory {
  currentMigration: Filename[];
  migrations: Directory[];
  databases: { [key: Environment]: number };
}

export type Directory = string;
export type Filename = string;
export type Environment = string;
