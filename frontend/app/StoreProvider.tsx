"use client"
import React, { useRef } from 'react';
import { store, Store } from '../lib/features/store';
import { Provider } from "react-redux";

const StoreProvider = ({ children }: { children: React.ReactNode }) => {
    const storeRef = useRef<Store>()
    if (!storeRef.current) {
        // Create the store instance the first time this renders
        storeRef.current = store()
    }

    return (
        <Provider store={storeRef.current}>
            {children}
        </Provider>
    )
}

export default StoreProvider
