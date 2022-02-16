import React, { useState } from 'react'
import ReactTooltip from 'react-tooltip';

export default function EditorToolbar({editor, viewer}) {

    const [visible, setVisible] = useState(false);

  return (
    <>
        <ReactTooltip effect='solid' />
        <p className="toolbar-button" data-tip={!visible ? "Afficher le menu d'edition" : "Masquer le menu d'édition"} onClick={() => setVisible(!visible)}>{visible ? <i class="fas fa-tools"></i> : <i class="fas fa-wrench"></i>}</p>

        {editor && (
            <>
                {visible && (
                    <div className="toolbar">
                        <i class="fas fa-times-circle exit" onClick={() => setVisible(false)}></i>
                    </div>
                )}
            </>
            
        )}

    </>


  )
}
