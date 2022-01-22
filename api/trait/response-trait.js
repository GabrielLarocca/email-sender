/**
 * Return an success JSON response.
 *
 * @param  string  message
 * @param  int  code
 * @param  array|string|null data
 * @return JSON
 */
exports.success = async (res, data, message = null, code = 200) => {
	let json = { status: 'Success', message, data, code }

	res.json(json);
};

/**
 * Return an error JSON response.
 *
 * @param  string  message
 * @param  int  code
 * @param  array|string|null data
 * @return JSON
 */
exports.error = async (res, data, message = null, code = 404) => {
	let json = { status: 'Error', message, data, code }

	res.json(json);
};