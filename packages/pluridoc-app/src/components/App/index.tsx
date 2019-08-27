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
                        key={Math.random()*10000 + ''}
                        className="plurid-plane"
                    >
                        {
                            text.map((txt: any) => {
                                return (
                                    <p
                                        key={Math.random()*10000 + ''}
                                    >
                                        {txt}
                                    </p>
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
