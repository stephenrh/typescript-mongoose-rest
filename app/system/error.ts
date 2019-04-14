export default class Error {

    private static generic() {
        return "An error has happened"
    }

    public static print(error: string) {
       return this[error]();
    }
}