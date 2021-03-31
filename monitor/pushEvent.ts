/**
 * 埋点推送到百度统计
 * @type {(data: EventData) => void} - data: {type: 类型, action: 动作, label?: 标签, value?: 价值}
 */
export interface EventData {
    type: string;
    action: string;
    label?: string;
    value?: string;
}

export const pushEvent = (data: EventData) => {
    const {type, action, label, value} = data;
    const pushConfig = ['_trackEvent', type, action];
    label && pushConfig.push(label);
    value && pushConfig.push(value);

    window._hmt && window._hmt.push(pushConfig);
};

export default pushEvent;
