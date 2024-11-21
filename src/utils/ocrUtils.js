// src/utils/ocrUtils.js
export const parseString = (input) => {
  return input.split(" ").map((item) => {
    return isNaN(item) ? item : Number(item);
  });
};

export const convertToGrayscale = (imageData) => {
  const data = imageData.data;
  for (let i = 0; i < data.length; i += 4) {
    const avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
    data[i] = data[i + 1] = data[i + 2] = avg;
  }
  return imageData;
};

export const binarizeImage = (imageData, threshold = 128) => {
  const data = imageData.data;
  for (let i = 0; i < data.length; i += 4) {
    const avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
    const value = avg < threshold ? 0 : 255;
    data[i] = data[i + 1] = data[i + 2] = value;
  }
  return imageData;
};

export const calculateMode = (data) => {
  const frequency = {};
  data.forEach((value) => {
    frequency[value] = (frequency[value] || 0) + 1;
  });

  let mode = null;
  let maxFrequency = 0;
  for (const key in frequency) {
    if (frequency[key] > maxFrequency) {
      mode = Number(key);
      maxFrequency = frequency[key];
    }
  }
  return mode;
};
