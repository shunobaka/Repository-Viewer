import { repositoriesFiltered, repositoriesLoaded } from './repository';
import { REPOSITORIES_FILTERED, REPOSITORIES_LOADED } from './types';

describe('repositoriesLoaded', () => {
  const mockRepos = [
    {
      name: 'Test',
      id: 0,
    },
    {
      name: 'Test 2',
      id: 1,
    },
  ];

  it('sets correct type', () => {
    const action = repositoriesLoaded(mockRepos);

    expect(action.type).toEqual(REPOSITORIES_LOADED);
  });

  it('sets correct payload', () => {
    const action = repositoriesLoaded(mockRepos);

    expect(action.payload).toBe(mockRepos);
  });
});

describe('repositoriesFiltered', () => {
  const query = 'query';

  it('sets correct type', () => {
    const action = repositoriesFiltered(query);

    expect(action.type).toEqual(REPOSITORIES_FILTERED);
  });

  it('sets correct payload', () => {
    const action = repositoriesFiltered(query);

    expect(action.payload).toBe(query);
  });
});
