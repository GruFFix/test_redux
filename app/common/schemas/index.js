import { schema } from 'normalizr';

export const actor = new schema.Entity('actors');

export const movie = new schema.Entity('movies', {
  actors: [actor],
});

