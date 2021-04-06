import { filters, modes } from './constants';


export default function mask(target, mask = '*', filter = filters.NUMBERS, mode = modes.AUTO, placeholder = null) {

    let result   = '';
	let index    = 0;
    let repeater = null;

    try {
        target = target.toString();
        placeholder = placeholder.toString();
    } finally {}

    const reverse = (mode === 'auto') ? (/^[^?]*\*.*\?.*$/.test(mask.replace(/\{\d+\|.+\}/i, '*')) || placeholder) : (mode === 'reverse');
    
    if(reverse)     target = target.split('').reverse().join('');
	if(filter)      target = target.replace(filter, '');
    if(placeholder) target = target.replace(new RegExp('[' + placeholder + ']+$','gim'), '');
	if(target === '' || !target) return '';

    if(Array.isArray(mask)) {
        mask.sort((a, b) => a.replace(/\{\d+\|.+\}/i, '*').replace(/[^?*]/gim,'').length - b.replace(/\{\d+\|.+\}/i, '*').replace(/[^?*]/gim,'').length);
        
        for(let c = 0; c < mask.length; c++) {
            if(mask[c].replace(/\{\d+\|.+\}/i, '*').replace(/[^?*]/gim,'').length >= target.length || c === (mask.length - 1)) {
                mask = mask[c];
                break;
            }
        }
    }
    
    if(/\{\d+\|.+\}/i.test(mask)) {
        repeater = mask.match(/\{(\d+)\|(.+)\}/i);
        mask     = mask.replace(/\{\d+\|.+\}/i, '*');
    }

    if(reverse && /^[^*]*$/gim.test(mask) && target.length > mask.replace(/[^?]/gim,'').length) {
        target = target.substring(1);
    }
	
	loop: for (
        let c = reverse ? (mask.length-1) : 0;
        reverse ? c >= 0 : c < mask.length;
        reverse ? c--    : c++
    ) {
	  switch(mask.charAt(c)) {
		  
		  case '?':
        
		  	if(target.charAt(index)) {
                if(reverse) result =  target.charAt(index) + result;
			    else        result += target.charAt(index);
				index++;
			} else if(placeholder) {
                if(reverse) result  = placeholder + result;
                else        result += placeholder;
            } else break loop;
            
			break;
		  
		  case '*':
		  	
            const remaining = repeater
                ? (target.substring(index).match(new RegExp('.{1,' + repeater[1] + '}', 'g')) || []).join(repeater[2])
                : target.substring(index);

            if(!remaining && !placeholder) break loop;

            if(reverse) {
                const finisher = mask.substring(0, c).replace(/[?*]/gim,'');
                return finisher + ((remaining) ? remaining.split('').reverse().join('') : (placeholder || '')) + result;
            } else {
                const finisher  = mask.substring(c+1).replace(/[?*]/gim,'');
			    return result + ((remaining) ? remaining : (placeholder || '')) + finisher;
            }
			
		  default:

            if(reverse) result = mask.charAt(c) + result;
            else        result += mask.charAt(c);

            break;
		  
	  }
	}
	
	const last = reverse ? result.charAt(0) : result.charAt(result.length-1);
    if(reverse && last !== target.charAt(index-1) && last !== mask.charAt(0) && last !== placeholder) {
        result = result.substring(1);
    } else if(!reverse && last !== target.charAt(index-1) && last !== mask.charAt(mask.length-1) && last !== placeholder) {
        result = result.slice(0,-1);
    }
	
	return result;

}

export function applyMask(target, config) {

    return mask(target, config.mask, config.filter, config.mode, config.placeholder);

}
