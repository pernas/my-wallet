import { Left, Right } from 'data.either'


export const parseJSON = (json) => {
  try {
    return Right(JSON.parse(json));
  } catch (e) {
    return Left("Wrong password");
  }
}
