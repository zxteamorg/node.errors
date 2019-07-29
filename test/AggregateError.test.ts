import { AggregateError } from "../src/index";

import { assert } from "chai";

describe("AggregateError test", function () {
	it("should be instntable without inner errors", function () {
		const aggrError = new (AggregateError as any)();
		assert.equal(aggrError.message, AggregateError.name);
	});

	it("should be instntable without inner errors", function () {
		const aggrError = new AggregateError([]);
		assert.equal(aggrError.message, AggregateError.name);
	});

	it("should concatenate messages from inner errors", function () {
		let err1: Error;
		let err2: Error;
		let err3: Error;

		try { throw new Error("Err1"); } catch (e) { err1 = e; }
		try { throw new Error("Err2"); } catch (e) { err2 = e; }
		try { throw new Error("Err3"); } catch (e) { err3 = e; }

		const aggrError = new AggregateError([err1, err2, err3]);

		assert.equal(aggrError.message, "Err1");
		assert.equal(aggrError.toString(), `${err1.toString()}\n${err2.toString()}\n${err3.toString()}`);
	});
});
