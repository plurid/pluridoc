import {
    IPluridocApp,
} from '../../interfaces';



class PluridocApp implements IPluridocApp {
    private content: any;

    constructor(content: any) {
        this.content = content;
    }

    render () {
        let content = '';
        this.content.map((plane: any) => {
            let text = '';
            plane.text.map((textData: any) => {
                text += `<p>${textData}</p>`;
            });
            content += `<p>${text}</p>`;
        });

        return `
            <html>
                <div>
                    ${content}
                </div>
            </html>
        `;
    }
}


export default PluridocApp;
