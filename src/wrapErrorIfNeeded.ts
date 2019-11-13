export function wrapErrorIfNeeded(likeError: any): Error {
	if (likeError) {
		if (likeError instanceof Error) {
			return likeError;
		} else {
			return new Error(likeError.toString());
		}
	}
	return new Error();
}
