export function logError(context = '', err = null) {
  if (err) {
    console.error(context, err);
  } else {
    console.error(context);
  }
}
