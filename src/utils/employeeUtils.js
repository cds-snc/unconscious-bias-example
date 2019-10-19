const getRandomInt = max => {
  return Math.floor(Math.random() * Math.floor(max));
};

function compareEmployees(a, b) {
  if (a.score < b.score) {
    return -1;
  }
  if (a.score > b.score) {
    return 1;
  }
  return 0;
}

const attrition = (level, attritionRate) => {
  return level.map(employee => ({
    boxStatus: Math.random() < attritionRate ? "vacant" : employee.boxStatus,
    gender: employee.gender,
    score: employee.score
  }));
};

const promoteBestEmployee = sortedPool => {
  let bestEmployee = { boxStatus: "filled" };
  for (let employee of sortedPool) {
    if (employee.boxStatus === "filled") {
      employee.boxStatus = "vacant";
      bestEmployee.gender = employee.gender;
      bestEmployee.score = employee.score;
      break;
    }
  }
  if (!bestEmployee.gender) {
    console.log("ERROR: can't find someone to promote!!!");
  }
  return [bestEmployee, sortedPool];
};

const fillByPromotion = (level, previousLevel) => {
  const newLevel = level.map(employee => {
    if (employee.boxStatus === "vacant") {
      let promotedEmployee;
      [promotedEmployee, previousLevel] = promoteBestEmployee(previousLevel);
      return promotedEmployee;
    } else {
      return employee;
    }
  });
  return [newLevel, previousLevel];
};

export const fillRandomly = (level, bias) => {
  const newLevel = level.map(employee => {
    if (employee.boxStatus === "vacant") {
      const gender = getRandomInt(2) === 0 ? "male" : "female";
      return {
        boxStatus: "filled",
        gender,
        score: getRandomInt(100) + gender === "male" ? bias : 0
      };
    } else {
      return employee;
    }
  });
  return newLevel;
};

export const stepAllLevels = (levels, attritionRate, bias) => {
  // people across the department quit
  levels = levels.map(level => attrition(level, attritionRate));
  // now we have to fill the vacancies, starting at the top (don't want to promote someone twice)
  for (let levelIndex = levels.length - 1; levelIndex >= 1; levelIndex--) {
    [levels[levelIndex], levels[levelIndex - 1]] = fillByPromotion(
      levels[levelIndex],
      levels[levelIndex - 1]
    );
  }
  // Now fill in the bottom level by random people
  levels[0] = fillRandomly(levels[0], bias);
  // finally, resort all the levels
  levels = levels.map(level => level.sort(compareEmployees));
};

export const countGenders = level => {
  const numberOfWomen = level.filter(employee => employee.gender === "female")
    .length;
  return [numberOfWomen, level.length - numberOfWomen];
};
