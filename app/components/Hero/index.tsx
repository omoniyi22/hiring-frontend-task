import React, { useState } from 'react'
import Join from './Join';
import { useSelector } from 'react-redux';
import { RootState } from '@/app/state/store';

export default function Hero() {

    const { username } = useSelector((state: RootState) => state.user || {});

    return (
        <>
            <Join />
        </>
    )
}
