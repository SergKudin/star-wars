import { FindManyOptions, FindOptionsWhere, In, Repository } from "typeorm";

export const createFakeRepository = <Entity>(testData: Entity[]) => {

  const fakeRepository: Partial<Repository<Entity>> = {};

  fakeRepository.findOne = async (options: FindManyOptions<Entity>) => {
    return testData.find((item) => {
      return isObjectMatchingCondition(item, options)
    });
  }

  fakeRepository.save = async (entities: Entity[]): Promise<Entity[]> => {
    if (!Array.isArray(entities)) {
      entities = [entities];
    }
    entities.map((entity) => {
      const index = findIndex(entity)
      if (index > -1) {
        testData[index] = entity
        return index > -1;
      } else {
        testData.push(entity)
      }
    })
    return Promise.all(entities.filter(async (entity) => {
      return findIndex(entity) > -1
    }));
  };

  fakeRepository.find = async (options?: FindManyOptions<Entity>): Promise<Entity[]> => {
    if (options?.where) {
      const whereConditions = options.where;
      const whereKeys = Object.keys(whereConditions);

      if (whereKeys.length === 1 && whereConditions[whereKeys[0]] instanceof In) {
        const key = whereKeys[0];
        const valuesToCheck = whereConditions[key].value;

        return testData.filter((item) => valuesToCheck.includes(item[key]));
      }
    }

    return testData.filter((item) => {
      return isObjectMatchingCondition(item, options)
    });
  };

  function findIndex(entity: Entity) {
    const arrId = ["film_id", "_id", "planet_id", "species_id", "starship_id", "vehicle_id"]
    let idName = null;
    let idValue = null;

    for (const field of arrId) {
      if (entity.hasOwnProperty(field)) {
        idName = field;
        idValue = entity[field];
        break;
      }
    }
    for (let i = 0; i < testData.length; i++) {
      if (testData[i][idName] === idValue) {
        return i;
      }
    }
    return -1;
  }

  function isObjectMatchingCondition(item: Entity, options: FindManyOptions<Entity>): Boolean {
    if (options?.where) {
      const whereConditions: FindOptionsWhere<Entity> | FindOptionsWhere<Entity>[] = options.where;
      const whereKeys: string[] = Object.keys(whereConditions);

      if (whereKeys.length === 1) {
        const key = whereKeys[0];
        const valuesToCheck = whereConditions[key];

        return valuesToCheck === item[key];
      }
    }
    return false;
  }

  return fakeRepository;
};

