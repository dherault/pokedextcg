const vision = require('@google-cloud/vision');

const projectId = 'pokedextcg';
const location = 'A compute region name';
const productSetId = 'Id of the product set';
const productSetDisplayName = 'Display name of the product set';

function createProductSet() {
  // Creates a client
  const client = new vision.ProductSearchClient();

  /**
   * TODO(developer): Uncomment the following line before running the sample.
   */

  // Resource path that represents Google Cloud Platform location.
  const locationPath = client.locationPath(projectId, location);

  const productSet = {
    displayName: productSetDisplayName,
  };

  const request = {
    parent: locationPath,
    productSet: productSet,
    productSetId: productSetId,
  };

  const [createdProductSet] = await client.createProductSet(request);
  console.log(`Product Set name: ${createdProductSet.name}`);
}
