import React from 'react';



interface AppOwnProperties {
    content: any;
}

const App: React.FC<AppOwnProperties> = (properties) => {
    const {
        content,
    } = properties;

    return (
        <div>
            {content.map((itemContent: any) => {
                const {
                    text,
                } = itemContent;

                return (
                    <div
                        key={Math.random()*100 + ''}
                        className="plurid-plane"
                    >
                        {
                            text.map((txt: any) => {
                                return (
                                    <>
                                        {txt}
                                        <br />
                                    </>
                                );
                            })
                        }
                    </div>
                );
            })}
        </div>
    );
}


export default App;
