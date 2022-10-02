const assert = require("assert");
const { describe, it } = require("test");
const axios = require("axios").default;
const BMIHelper = require("../helper/helperFunctions.js");

const getData = (data) => {
  return axios.post(
    "http://localhost:3000/test",
    { ...data },
    {
      method: "post",
      headers: { "content-type": "application/json" },
    }
  );
};

describe('Testing the API Endpoint "Test"', () => {

  it("Testing the Helper function to get expected Enhanced risk as Health Risk", () => {
    const bmiHelper = new BMIHelper();
    let bmiCategory = bmiHelper.BMICategories(82, 167).healthRisk;
    assert(bmiCategory,"Enhanced risk");
  });

  it("Testing the Helper function to get expected Low risk as Health Risk", () => {
    const bmiHelper = new BMIHelper();
    let bmiCategory = bmiHelper.BMICategories(77, 180).healthRisk;
    assert(bmiCategory,"Low risk");
  });

  it("Testing the Helper function to get expected Medium risk as Health Risk", () => {
    const bmiHelper = new BMIHelper();
    let bmiCategory = bmiHelper.BMICategories(70, 150).healthRisk;
    assert(bmiCategory,"Medium risk");
  });

  it("Testing the Helper function to get expected Normal weight BMI Category", () => {
    const bmiHelper = new BMIHelper();
    let bmiCategory = bmiHelper.BMICategories(62, 166).BMICategory;
    assert.deepStrictEqual(bmiCategory,"Normal weight");
  });

  it("Testing the Helper function to get expected Moderately obese BMI Category", () => {
    const bmiHelper = new BMIHelper();
    let bmiCategory = bmiHelper.BMICategories(96, 171).BMICategory;
    assert.deepStrictEqual(bmiCategory,"Moderately obese");
  });

  it("Testing the Helper function to get expected Over Weight BMI Category", () => {
    const bmiHelper = new BMIHelper();
    let bmiCategory = bmiHelper.BMICategories(82, 167).BMICategory;
    assert.deepStrictEqual(bmiCategory,"OverWeight");
  });

  it("Testing the Helper function to get expected BMI with Input of Weight and Height", () => {
    const bmiHelper = new BMIHelper();
    let bmi = (bmiHelper.BMICategories(96, 171)).BMI;
    assert.equal(bmi, 32.83);
  });

  it("Testing the Helper function to get expected BMI with Input of Weight and Height", () => {
    const bmiHelper = new BMIHelper();
    let bmi = (bmiHelper.BMICategories(85, 161)).BMI;
    assert.equal(bmi, 32.79);
  });

  it("Testing the Helper function to get expected BMI with Input of Weight and Height", () => {
    const bmiHelper = new BMIHelper();
    let bmi = (bmiHelper.BMICategories(75, 175)).BMI;
    assert.equal(bmi, 24.49);
  });

  it("Should call the Test APi with 200 HTTP Responce", async () => {
    let data = {
      test: [
        {
          Gender: "Male",
          HeightCm: 171,
          WeightKg: 96,
        },
      ],
    };

    const response = {
      overWeightedPersons: 1,
      data: [
        {
          BMI: "32.83",
          BMICategory: "Moderately obese",
          healthRisk: "Medium risk",
        },
      ],
    };
    const result = await getData(data);
    assert.deepEqual(result.data, response);
  });

  it("Should call the Test APi with 200 HTTP Responce and Proper Over Weighted People Count", async () => {
    let data = {
      test: [
        {
          Gender: "Male",
          HeightCm: 171,
          WeightKg: 96,
        },
        {
          Gender: "Male",
          HeightCm: 161,
          WeightKg: 85,
        },
        {
          Gender: "Male",
          HeightCm: 180,
          WeightKg: 77,
        },
        {
          Gender: "Female",
          HeightCm: 166,
          WeightKg: 62,
        },
        {
          Gender: "Female",
          HeightCm: 150,
          WeightKg: 70,
        },
        {
          Gender: "Female",
          HeightCm: 167,
          WeightKg: 82,
        },
      ],
    };
    const result = await getData(data);
    assert.deepEqual(result.data.overWeightedPersons, 4);
  });
});
