export class AggregateError extends Error {
	public readonly innerError: Error | null;
	public readonly innerErrors: ReadonlyArray<Error>;
	public constructor(innerErrors: ReadonlyArray<Error>) {
		super(innerErrors && innerErrors.length > 0 ? innerErrors[0].message : "AggregateError");
		if (innerErrors) {
			this.innerError = innerErrors.length > 0 ? innerErrors[0] : null;
			this.innerErrors = innerErrors.slice();
		} else {
			this.innerError = null;
			this.innerErrors = [];
		}
	}

	public toString(): string {
		if (this.innerErrors.length === 0) { return super.toString(); }
		return this.innerErrors.map(e => e.toString()).join("\n");
	}
}
