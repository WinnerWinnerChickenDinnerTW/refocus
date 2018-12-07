/**
 * Copyright (c) 2018, salesforce.com, inc.
 * All rights reserved.
 * Licensed under the BSD 3-Clause license.
 * For full license text, see LICENSE.txt file in the repo root or
 * https://opensource.org/licenses/BSD-3-Clause
 */

/**
 * api/v1/helpers/verbs/doPostBulk.js
 */
const u = require('./utils');
const pu = require('./postUtils');

/**
 * Creates new records and sends it back in the json response with status
 * code 201.
 *
 * @param {IncomingMessage} req - The request object
 * @param {ServerResponse} res - The response object
 * @param {Function} next - The next middleware function in the stack
 * @param {Module} props - The module containing the properties of the
 *  resource type to post.
 */
function doPostBulk(req, res, next, props) {
  const resultObj = { reqStartTime: req.timestamp };
  const params = req.swagger.params;
  u.mergeDuplicateArrayElements(params.queryBody.value, props);
  pu.makeBulkPostPromise(params, props, req)
  .then((o) => pu.handlePostResult(o, resultObj, props, res, req))
  .catch((err) => u.handleError(next, err, props.modelName));
}

module.exports = doPostBulk;
