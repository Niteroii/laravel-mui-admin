const SCHEMA = blade('model-schema');

const getClassSchema = (className) => {
    if (!SCHEMA[className]) {
        throw new Error(`Schema for class '${className}' not found.`);
    }
    const { [className]: schema } = SCHEMA;
    return schema;
};

const filterObjectByKeys = (keys, obj) => Object.keys(obj)
    .filter((key) => keys.includes(key))
    .reduce((acc, key) => {
        acc[key] = obj[key];
        return acc;
    }, {});

/**
 * Base model class.
 */
class BaseModel {

    #className;
    #attributes;
    #id;
    #fillable;
    #original;
    #createdAt;
    #updatedAt;

    /**
     * Cria uma nova instância de Model.
     *
     * @param {string} className - Nome da classe em caixa baixa. Ex: 'user'.
     * @param {object} attributes - Atributos do modelo.
     */
    constructor(className, attributes = {}) {
        const { fillable } = getClassSchema(className);

        this.#attributes = filterObjectByKeys(fillable, attributes);

        const { id = 0, created_at: createdAt, updated_at: updatedAt } = attributes;

        fillable.forEach((key) => {
            if (this.#attributes[key] === undefined) {
                this.#attributes[key] = null;
            }
        });

        this.#className = className;

        this.#original = { ...this.#attributes };
        this.#id = id;
        this.#fillable = fillable;

        this.#createdAt = createdAt
            ? new Date(createdAt)
            : null;

        this.#updatedAt = updatedAt
            ? new Date(updatedAt)
            : null;
    }

    /**
     * Retorna o ID do modelo.
     *
     * @return {number} - ID do modelo.
     */
    get id() {
        return this.#id;
    }

    /**
     * Retorna os atributos do modelo.
     *
     * @return {object} - Atributos do modelo.
     */
    get attributes() {
        return this.#attributes;
    }

    /**
     * Retorna os atributos originais do modelo.
     *
     * @return {object} - Atributos originais do modelo.
     */
    get original() {
        return this.#original;
    }

    /**
     * Retorna os atributos preenchíveis do modelo.
     *
     * @return {string[]} - Atributos preenchíveis do modelo.
     */
    get fillable() {
        return this.#fillable;
    }

    /**
     * Retorna a data de criação do modelo.
     *
     * @return {Date|null} - Data de criação do modelo.
     */
    get createdAt() {
        return this.#createdAt;
    }

    /**
     * Retorna a data de atualização do modelo.
     *
     * @return {Date|null} - Data de atualização do modelo.
     */
    get updatedAt() {
        return this.#updatedAt;
    }

    /**
     * Modifica o valor de um atributo do modelo.
     *
     * @param {string} key - Nome do atributo.
     * @param {any} value - Valor do atributo.
     */
    setAttribute(key, value) {
        if (!this.#fillable.includes(key)) {
            return;
        }
        this.#attributes[key] = value;
    }

    /**
     * Modifica o valor de vários atributos do modelo.
     *
     * @param {object} attributes - Os atributos a serem modificados.
     */
    setAttributes(attributes) {
        const validAttributes = filterObjectByKeys(this.#fillable, attributes);
        this.#attributes = {
            ...this.#attributes,
            ...validAttributes,
        };
    }

    /**
     * Retorna os dados do objeto como um objeto plano.
     *
     * @return {object} - Objeto plano com os dados do objeto.
     */
    plain() {
        return {
            id: this.id,
            ...this.attributes,
            // eslint-disable-next-line camelcase
            created_at: this.createdAt,
            // eslint-disable-next-line camelcase
            updated_at: this.updatedAt,
        };
    }

    /**
     * Obtém os campos que foram modificados ou false caso nenhum campo tenha sido modificado.
     *
     * @return {object|boolean} - Objeto com os campos modificados ou
     * false caso nenhum campo tenha sido modificado.
     */
    diff() {
        const diff = {};
        Object.keys(this.original).forEach((key) => {
            if (this.original[key] !== this.attributes[key]) {
                diff[key] = this.attributes[key];
            }
        });
        return Object.keys(diff).length > 0 ? diff : false;
    }

}

/**
 * Model class.
 *
 */
export default class Model extends BaseModel {

    /**
     * Cria uma nova instância de Model.
     *
     * @param {string} className - Nome da classe em caixa baixa. Ex: 'user'.
     * @param {object} attributes - Atributos do modelo.
     */
    constructor(className, attributes) {
        super(className, attributes);

        return new Proxy(this, {
            get: (_target, prop) => {
                if (this.fillable.includes(prop)) {
                    return this.attributes[prop];
                }
                return this[prop];
            },
            set: (_target, prop, value) => {
                if (this.fillable.includes(prop)) {
                    this.setAttribute(prop, value);
                    return true;
                }
                this[prop] = value;
                return true;
            },
        });
    }

}
