import { InnerError } from "./InnerError";

export class AggregateError extends InnerError {
	public readonly innerErrors: ReadonlyArray<Error>;
	public constructor(innerErrors: ReadonlyArray<Error>) {
		let friendlyInnerError: Error | null;
		let friendlyInnerErrors: Array<Error>;
		let friendlyMessage: string;
		if (innerErrors.length > 0) {
			friendlyInnerErrors = [...innerErrors];
			friendlyInnerError = friendlyInnerErrors.length > 0 ? friendlyInnerErrors[0] : null;
			friendlyMessage = innerErrors.map(e => e.message).join("\n");
		} else {
			friendlyInnerErrors = [];
			friendlyInnerError = null;
			friendlyMessage = "AggregateError";
		}

		super(friendlyMessage, friendlyInnerError);

		this.innerErrors = friendlyInnerErrors;
	}

	public toString(): string {
		if (this.innerErrors.length === 0) { return super.toString(); }
		return this.innerErrors.map(e => e.toString()).join("\n");
	}
}
