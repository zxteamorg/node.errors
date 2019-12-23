export class AggregateError extends Error {
	public readonly innerError: Error | null;
	public readonly innerErrors: ReadonlyArray<Error>;
	public constructor(innerErrors: ReadonlyArray<Error>) {
		let friendlyInnerError: Error | null;
		let friendlyInnerErrors: Array<Error>;
		if (innerErrors) {
			friendlyInnerErrors = [...innerErrors].reverse();
			friendlyInnerError = friendlyInnerErrors.length > 0 ? friendlyInnerErrors[0] : null;
		} else {
			friendlyInnerErrors = [];
			friendlyInnerError = null;
		}

		super(friendlyInnerError !== null ? friendlyInnerError.message : "AggregateError");

		this.innerErrors = friendlyInnerErrors;
		this.innerError = friendlyInnerError;
	}

	public toString(): string {
		if (this.innerErrors.length === 0) { return super.toString(); }
		return this.innerErrors.map(e => e.toString()).join("\n");
	}
}
