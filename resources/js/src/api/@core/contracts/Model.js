import axios from 'axios';
import { OBJECT_UPDATE_DATA } from '../../constants/actions';
import state from '../../state';
import { v4 as uuidv4 } from 'uuid';
import toast from '../toast';

/**
 * Model class.
 *
 */
export default class Model {

    #id;
    // #data;
    #changed = [];
    #stateMap = false;
    #updatedAt;
    #createdAt;
    #parent;
    #key;

    #entity;

    /**
     * Cria uma nova instância do modelo.
     *
     * @param {string} entity - O nome da entidade.
     * @param {object} data - Os dados do modelo.
     */
    constructor(entity, data) {
        this.#entity = entity;
        this.dispatchData(data);
    }

    key = () => this.#key;

    getId = () => this.#id;

    serialize = () => ({
        id: this.#id,
        updated_at: this.#updatedAt,
        created_at: this.#createdAt,
        ...this.data(),
    });

    data = () => state.store.getState().objects[this.getEntity()][this.getId()];

    updateData = (data) => {
        Object.keys(data).forEach((key) => {
            this.setProp(key, data[key]);
        });
    };

    setProp = (key, value) => {
        if (!this.#changed.includes(key)) {
            this.#changed.push(key);
        }

        // if (options.merge && typeof this.#data[key] === 'object') {
        //     this.#data[key] = {
        //         ...this.#data[key],
        //         ...value,
        //     };
        //     return;
        // }

        state.dispatch({
            type: OBJECT_UPDATE_DATA,
            payload: {
                entity: this.getEntity(),
                id: this.getId(),
                data: {
                    ...this.data(),
                    [key]: value,
                },
            },
        });

        return value;
    };

    getProp = (key) => {
        const data = this.data();

        // makes !(key in data) with Object.keys
        if (!Object.keys(data).includes(key)) {
            return null;
        }

        return data[key];
    };

    getEntity = () => this.#entity;

    getBaseUrl = () => `/api/${this.getEntity()}`;

    getCreateUrl = () => `${this.getBaseUrl()}`;
    getSaveUrl = () => `${this.getBaseUrl()}/${this.#id}`;
    getDeleteUrl = () => `${this.getBaseUrl()}/${this.#id}`;

    diff = () => {
        const object = {};

        this.#changed.forEach((key) => {
            object[key] = this.getProp(key);
        });

        return object;
    };

    getUpdatePayload = this.data;
    getCreatePayload = this.data;
    getDeletePayload = () => ({ id: this.getId() });

    dispatchData = (data) => {
        const {
            id = 0, updated_at, created_at, ...modelData
        } = data;

        this.#id = id;
        this.#updatedAt = updated_at;
        this.#createdAt = created_at;
        this.#key = uuidv4();

        state.dispatch({
            type: OBJECT_UPDATE_DATA,
            payload: {
                entity: this.#entity,
                data: modelData,
                id,
            },
        });
    };

    save = async (options = {}) => {
        const { displayAlert = true, additionalPayload = {} } = options;

        const data = this.#id === 0
            ? this.getCreatePayload()
            : this.getUpdatePayload();

        const mode = this.#id === 0
            ? 'create'
            : 'update';

        const url = mode === 'create'
            ? this.getCreateUrl()
            : this.getSaveUrl();

        const payload = {
            ...data,
            ...additionalPayload,
        };

        const { data: response, status } = await axios({
            url,
            method: 'POST',
            data: payload,
        });

        if (displayAlert && response.message) {
            toast.create(response.message);
        }

        if ([200, 201].includes(status)) {
            const dispatchObject = mode === 'create'
                ? { id: response.id, ...response.data || data }
                : response.data || data;

            this.dispatchData(dispatchObject);

            return true;
        }

        return false;
    };

    delete = async (options = {}) => {
        const { additionalPayload = {}, displayAlert = true } = options;

        const data = this.getDeletePayload();

        const url = this.getDeleteUrl();

        const { data: response, status } = await axios({
            url,
            method: 'DELETE',
            data: JSON.stringify({
                ...data,
                ...additionalPayload,
            }),
        });

        if (displayAlert && response.message) {
            toast.create(response.message);
        }

        return status === 204;
    };

    disable = async (options = {}) => {
        const { additionalPayload = {}, displayAlert = false } = options;

        const data = this.getDeletePayload();

        const url = `${this.getBaseUrl()}/${this.getId()}/disable`;

        const response = await request({
            url,
            method: 'post',
            data: JSON.stringify({
                ...data,
                ...additionalPayload,
            }),
        });

        if (displayAlert) {
            alerts.create({ message: response.message });
        }

        state.dispatch({
            type: SUBJECT_ITEM_DELETED,
            payload: this.getId(),
        });

        return response.status === 'success';
    };

    restore = async (options = {}) => {
        const { additionalPayload = {}, displayAlert = false } = options;

        const url = `${this.getBaseUrl()}/${this.getId()}/restore`;

        const response = await request({
            url,
            method: 'post',
            data: JSON.stringify({ ...additionalPayload }),
        });

        if (displayAlert) {
            alerts.create({ message: response.message });
        }

        state.dispatch({
            type: SUBJECT_ITEM_DELETED,
            payload: this.getId(),
        });

        return response.status === 'success';
    };

    isTrashed = () => !!this.getProp('deleted_at');

    /**
     * @deprecated
     */
    hasBindState = () => !!this.#stateMap;

    /**
     * @param {*} states
     * @deprecated
     */
    bindState = (states) => {
        this.#stateMap = states;
    };

    fields = () => [];

    getItemParams = () => ({
        title: 'Title',
        subtitle: 'Subtitle',
        actions: [
            {
                icon: null,
                href: '/',
                tooltipText: 'Action!',
            },
        ],
    });

    static getColumns = () => [];

    setAsGlobalParentObject = () => {
        state.dispatch({
            type: actions.SUBJECT_SET_PARENT,
            payload: this.serialize(),
        });
    };

    setAsGlobalObject = () => {
        state.dispatch({
            type: actions.SUBJECT_SET_ITEM,
            payload: this.serialize(),
        });
    };

    injectParent = (parent) => {
        this.#parent = parent;
    };

    parent = () => this.#parent;

    useData = ({
        autoSave = false,
        onSave = () => null,
    } = {}) => {
        // review

        const [data, setData] = React.useState(this.data());

        React.useEffect(() => {
            const unsubscribe = state.store.subscribe(() => {
                setData(this.data());
            });
            return () => {
                unsubscribe();
            };
        }, []);

        const setProp = (key, value) => {
            this.setProp(key, value);
            if (autoSave) {
                this.save().then(onSave);
            }
        };

        return {
            data,
            setProp,
        };
    };

    useChilds = ({ childs, entity }) => {
        const [items, setItems] = React.useState(childs);

        const addItem = React.useCallback(() => {
            const item = new entity();
            item.injectParent(this);
            setItems([
                ...items,
                item,
            ]);
        }, [entity, items]);

        const removeItem = React.useCallback((key) => {
            setItems(items.filter((item) => item.key() != key));
        }, [items]);

        return {
            items,
            addItem,
            removeItem,
            setItems,
        };
    };

}
