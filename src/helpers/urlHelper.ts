import {router} from "../main.tsx";

export const getUrlPaths = (pathname) => {
    const paths = pathname.split('/')

    if (paths.length && !paths[0].length) paths.shift()

    return paths
}

export const getAllUrlKeys = (prefix, params) => {
    const res = []
    for (const key of params.keys()) {
        if (key.includes('#') && key.split('#')[0] !== prefix) continue;

        if (key.includes('#')) {
            // delete prefix
            const tmp = key.split('#')
            tmp.shift()
            res.push(tmp.join(''))

            continue
        }
        res.push(key)
    }
    return res
}

export function parseBreadcrumbs(items) {
    console.log(items)
    const seenCombination = {};
    let firstRouter = null
    let result = [];
    let newItems = [];

    for (let item of items) {
        const combinationKey = `${item.router}-${item.page}`;

        if (!(combinationKey in seenCombination)) {
            if (firstRouter === null) {
                firstRouter = item.router;
                result.push({
                    name: item.router_name,
                    link: `/${item.router}`
                });
            }

            result.push({
                name: item.page_name,
                link: `/${item.router}/${item.page}`
            });
            newItems.push(item);
            seenCombination[combinationKey] = result.length;
        } else {
            let sliceIndex = seenCombination[combinationKey];
            result = result.slice(0, sliceIndex);
            newItems = newItems.slice(0, sliceIndex - 1);
            return [result, newItems];
        }
    }

    return [result, newItems];
}

export const isAuthLocation = () => window.location.pathname === '/auth'
export const isRootLocation = () => window.location.pathname === '/'

export const addUrlParams = (key, value) => {
    router.navigate({
        search: (old) => ({
            ...old,
            [key]: value
        })
    });
}

export const removeUrlParam = (key) => {
    router.navigate({
        search: (old) => {
            const tmp = {...old}
            if (tmp[key]) delete tmp[key]

            return tmp
        }
    });
}