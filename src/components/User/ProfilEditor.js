import React from 'react';
import ProfilViewer from './ProfilViewer';

export default function ProfilEditor({ user }) {
    return (
        <div>
            <ProfilViewer user={user} />
        </div>
    );
}
