export class CellarDTO
{
    isOK: boolean;
    isException: boolean;
    isCustomError: boolean;
    isIdentityError: boolean;
    isValid: boolean;

    exceptionText: string;
    customErrorText: string;
    identityErrorText: string;
    validations: Array<Tuple>;
    data: Object;
    result: string;
}


export class Tuple
{
    key: string;
    value: string;
};