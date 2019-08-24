export const escapePluridPlaneDividers = (line: string) => {
    let _line = line.replace('\\<<<', '<<<');
    _line = _line.replace('\\>>>', '>>>');
    return _line;
}
