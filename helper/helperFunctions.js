module.exports = class BMIHelper {
  overWeight;

  constructor() {
    this.overWeight = 0;
  }

  /**
   * @author 
   * @description Calculate the BMICategory, and Health Risk according to BMI
   * @param {Decimal} weight
   * @param {Decimal} height
   * @returns {Object} {BMI, BMI_Category, Health_Risk}
   */
  BMICategories(weight, height) {
    const bmi = weight / Math.pow(height/100,2)
    const result = { BMI: bmi.toFixed(2), BMICategory: "", healthRisk: "" };

    if (bmi < 18.5) {
      (result.BMICategory = "Underweight"),
        (result.healthRisk = "Malnutrition risk");
    } else if (bmi >= 18.5 && bmi < 25) {
      (result.BMICategory = "Normal weight"), (result.healthRisk = "Low risk");
    } else if (bmi >= 25 && bmi < 30) {
      this.overWeight++;
      (result.BMICategory = "OverWeight"),
        (result.healthRisk = "Enhanced risk");
    } else if (bmi >= 30 && bmi < 35) {
      this.overWeight++;
      (result.BMICategory = "Moderately obese"),
        (result.healthRisk = "Medium risk");
    } else if (bmi >= 35 && bmi < 40) {
      this.overWeight++;
      (result.BMICategory = "Severel obese"), (result.healthRisk = "High risk");
    } else if (bmi >= 40) {
      this.overWeight++;
      (result.BMICategory = "Very severely obese"),
        (result.healthRisk = "Very high risk");
    }
    return result;
  }
};
