const request = require("supertest")("http://localhost:5001/api/v1");
const expect = require("chai").expect;

describe("GET /recipes", function () {
  it("is the API is functional test 1", async function () {
    const response = await request.get("/recipes?CleanedIngredients=coconut");

    expect(response.status).to.eql(200);
  });

  it("is the API is functional test 2", async function () {
    const response = await request.get("/recipes?CleanedIngredients=COCONUT");

    expect(response.status).to.eql(200);
  });

  it("is the API is functional test 3", async function () {
    const response = await request.get("/recipes?CleanedIngredients=mango");

    expect(response.status).to.eql(200);
  });

  it("is the API is functional test 4", async function () {
    const response = await request.get("/recipes?CleanedIngredients=MANGO");

    expect(response.status).to.eql(200);
  });

  it("is the API is functional test 5", async function () {
    const response = await request.get("/recipes?CleanedIngredients=Mango");

    expect(response.status).to.eql(200);
  });

  it("is the API is functional test 6", async function () {
    const response = await request.get("/recipes?CleanedIngredients=mANGO");

    expect(response.status).to.eql(200);
  });

  it("is the API is functional test 7", async function () {
    const response = await request.get(
      "/recipes?CleanedIngredients={mango, salt}",
    );

    expect(response.status).to.eql(200);
  });

  it("is the API is functional test 8", async function () {
    const response = await request.get(
      "/recipes?CleanedIngredients={salt, mango}",
    );

    expect(response.status).to.eql(200);
  });

  it("is the API is functional test 8", async function () {
    const response = await request.get("/recipes?CleanedIngredients={}");

    expect(response.status).to.eql(200);
  });

  it("is the API is fetching the filtered ingredient", async function () {
    const response = await request.get("/recipes?CleanedIngredients=pear");

    expect(response.body.filters.CleanedIngredients).to.eql("pear");
  });

  it("is the API is not fetching the filtered ingredient", async function () {
    const response = await request.get("/recipes?CleanedIngredients=pear");

    expect(response.body.filters.CleanedIngredients).to.not.eql("apple");
  });

  it("is the API is not fetching the filtered ingredient", async function () {
    const response = await request.get("/recipes?CleanedIngredients=pear");

    expect(response.body.filters.CleanedIngredients).to.not.eql("apple1");
  });
  it("is the API is not fetching the filtered ingredient", async function () {
    const response = await request.get("/recipes?CleanedIngredients=pear");

    expect(response.body.filters.CleanedIngredients).to.not.eql("apple2");
  });
  it("is the API is not fetching the filtered ingredient", async function () {
    const response = await request.get("/recipes?CleanedIngredients=pear");

    expect(response.body.filters.CleanedIngredients).to.not.eql("apple3");
  });
  it("is the API is not fetching the filtered ingredient", async function () {
    const response = await request.get("/recipes?CleanedIngredients=pear");

    expect(response.body.filters.CleanedIngredients).to.not.eql("apple4");
  });
  it("is the API is not fetching the filtered ingredient", async function () {
    const response = await request.get("/recipes?CleanedIngredients=pear");

    expect(response.body.filters.CleanedIngredients).to.not.eql("apple5");
  });
  it("is the API is not fetching the filtered ingredient", async function () {
    const response = await request.get("/recipes?CleanedIngredients=pear");

    expect(response.body.filters.CleanedIngredients).to.not.eql("apple6");
  });
  it("is the API is not fetching the filtered ingredient", async function () {
    const response = await request.get("/recipes?CleanedIngredients=pear");

    expect(response.body.filters.CleanedIngredients).to.not.eql("apple7");
  });
  it("is the API is not fetching the filtered ingredient", async function () {
    const response = await request.get("/recipes?CleanedIngredients=pear");

    expect(response.body.filters.CleanedIngredients).to.not.eql("apple8");
  });
  it("is the API is not fetching the filtered ingredient", async function () {
    const response = await request.get("/recipes?CleanedIngredients=pear");

    expect(response.body.filters.CleanedIngredients).to.not.eql("apple9");
  });
  it("is the API is not fetching the filtered ingredient", async function () {
    const response = await request.get("/recipes?CleanedIngredients=pear");

    expect(response.body.filters.CleanedIngredients).to.not.eql("apple10");
  });
  it("is the API is not fetching the filtered ingredient", async function () {
    const response = await request.get("/recipes?CleanedIngredients=pear");

    expect(response.body.filters.CleanedIngredients).to.not.eql("apple11");
  });
  it("is the API is not fetching the filtered ingredient", async function () {
    const response = await request.get("/recipes?CleanedIngredients=pear");

    expect(response.body.filters.CleanedIngredients).to.not.eql("apple12");
  });
  it("is the API is not fetching the filtered ingredient", async function () {
    const response = await request.get("/recipes?CleanedIngredients=pear");

    expect(response.body.filters.CleanedIngredients).to.not.eql("apple13");
  });
  it("is the API is not fetching the filtered ingredient", async function () {
    const response = await request.get("/recipes?CleanedIngredients=pear");

    expect(response.body.filters.CleanedIngredients).to.not.eql("apple14");
  });it("is the API is not fetching the filtered ingredient", async function () {
    const response = await request.get("/recipes?CleanedIngredients=pear");

    expect(response.body.filters.CleanedIngredients).to.not.eql("apple15");
  });it("is the API is not fetching the filtered ingredient", async function () {
    const response = await request.get("/recipes?CleanedIngredients=pear");

    expect(response.body.filters.CleanedIngredients).to.not.eql("apple16");
  });it("is the API is not fetching the filtered ingredient", async function () {
    const response = await request.get("/recipes?CleanedIngredients=pear");

    expect(response.body.filters.CleanedIngredients).to.not.eql("apple17");
  });it("is the API is not fetching the filtered ingredient", async function () {
    const response = await request.get("/recipes?CleanedIngredients=pear");

    expect(response.body.filters.CleanedIngredients).to.not.eql("apple18");
  });it("is the API is not fetching the filtered ingredient", async function () {
    const response = await request.get("/recipes?CleanedIngredients=pear");

    expect(response.body.filters.CleanedIngredients).to.not.eql("apple19");
  });
});
