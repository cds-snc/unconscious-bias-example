const getRandomInt = max => {
  return Math.floor(Math.random() * Math.floor(max));
};

// sort by descending score
function compareEmployees(a, b) {
  if (a.score > b.score) {
    return -1;
  }
  if (a.score < b.score) {
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
  let newLevel = level.map(employee => {
    if (employee.boxStatus === "vacant") {
      const gender = getRandomInt(2) === 0 ? "male" : "female";
      return {
        boxStatus: "filled",
        gender,
        score: getRandomInt(100) + (gender === "male" ? bias : 0)
      };
    } else {
      return employee;
    }
  });
  newLevel.sort(compareEmployees);
  return newLevel;
};

export const stepAllLevels = (levels, attritionRate, bias) => {
  // people across the department quit
  let newLevels = levels.map(level => attrition(level, attritionRate));
  // now we have to fill the vacancies, starting at the top (don't want to promote someone twice)
  for (let levelIndex = newLevels.length - 1; levelIndex >= 1; levelIndex--) {
    [newLevels[levelIndex], newLevels[levelIndex - 1]] = fillByPromotion(
      newLevels[levelIndex],
      newLevels[levelIndex - 1]
    );
  }
  // Now fill in the bottom level by random people
  newLevels[0] = fillRandomly(newLevels[0], bias);
  // finally, resort all the levels
  newLevels = newLevels.map(level => level.sort(compareEmployees));
  return newLevels;
};

export const countGenders = level => {
  const numberOfWomen = level.filter(employee => employee.gender === "female")
    .length;
  return [numberOfWomen, level.length - numberOfWomen];
};
