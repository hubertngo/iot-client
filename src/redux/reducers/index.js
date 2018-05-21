/* --------------------------------------------------------
* Author Trần Đức Tiến
* Email ductienas@gmail.com
* Phone 0972970075
*
* Created: 2017-12-16 00:42:57
*------------------------------------------------------- */
import auth, { initialState as initialAuth } from './auth';
import loading, { initialState as initialLoading } from './loading';
import modal, { initialState as initialModal } from './modal';

import user, { initialState as initialUser } from './user';
import lang, { initialState as initialLang } from './lang';

export const initialState = {
	auth: initialAuth,
	loading: initialLoading,
	modal: initialModal,
	user: initialUser,
	lang: initialLang,
};

export default {
	auth,
	loading,
	modal,
	user,
	lang,
};
