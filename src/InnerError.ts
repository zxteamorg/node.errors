import { wrapErrorIfNeeded } from "./wrapErrorIfNeeded";

export class InnerError extends Error {
	public readonly innerError: Error | null;

	public constructor();
	public constructor(message: string);
	public constructor(message: string, innerError: any);
	public constructor(message: string, innerError: Error);

	public constructor(message?: any, inner?: any) {
		if (message === undefined) {
			super();
			this.innerError = null;
		} else {
			if (typeof message === "string") {
				super(message);
				if (inner !== undefined && inner !== null) {
					this.innerError = wrapErrorIfNeeded(inner);
				} else {
					this.innerError = null;
				}
			} else if (message instanceof Error) {
				super(message.message);
				this.innerError = null;
			} else {
				throw new Error("Wrong arguments. First agrument should be a string (if present).");
			}
		}
	}

	public toString(): string {
		if (this.innerError !== null) {
			return [super.toString(), this.innerError.toString()].join("\n");
		}
		return super.toString();
	}
}
