package com.hotplace25.util;

import java.util.ArrayList;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import org.apache.commons.lang3.StringUtils;

import com.hotplace25.domain.Account;
import com.hotplace25.domain.Coupon;
import com.hotplace25.domain.Payment;
import com.hotplace25.types.PaymentServiceSubtype;
import com.hotplace25.types.PaymentServiceType;

public class ValidationUtil {

	private final static String EMAIL_REGEX = "^[\\w-\\+]+(\\.[\\w]+)*@[\\w-]+(\\.[\\w]+)*(\\.[a-z]{2,})$";
	private final static String PASSWORD_REGEX = "^(?=.*[A-Za-z])(?=.*\\d)(?=.*[$@$!%*#?&.^~()`_,/+=-])[A-Za-z\\d$@$!%*#?&.^~()`_,/+=-]{8,}$";
	private final static String PHONE_REGEX = "\\d{2,4}-\\d{3,4}-\\d{4}";
	private final static String NUMBER_ONLY = "\\d+";
	
	private static boolean isValid(String value, String regex) {
		if(value == null || "".equals(value.trim())) return false;
		
		Pattern pattern = Pattern.compile(regex, Pattern.CASE_INSENSITIVE);
		Matcher matcher = pattern.matcher(value);
		
		return matcher.matches();
	}
	
	public static boolean isNotEmpty(String str) {
		if(str == null || "".equals(str.trim()))
			return false;
		
		return true;
	}
	
	public static boolean isValidEmail(String email) {
		return isValid(email, EMAIL_REGEX);
	}
	
	public static boolean isValidPassword(String password) {
		return isValid(password, PASSWORD_REGEX);
	}
	
	public static boolean isValidPhone(String phone) {
		return isValid(phone, PHONE_REGEX);
	}
	
	public static boolean isValidNumberOnly(String number, int maxlength) {
		if(number == null || "".equals(number.trim()) || number.length() > maxlength) return false;
		
		return isValid(number, NUMBER_ONLY);
		
	}
	
	public static boolean isValidNumberOnly(String number) {
		return isValid(number, NUMBER_ONLY);
	}
	
	public static boolean isValidAccount(Account account, boolean isPasswordCheck) {
		if(isPasswordCheck) {
			return isValidEmail(account.getEmail()) && isValidPassword(account.getPassword()) && isValidPhone(account.getPhone());
		}
		else {
			return isValidEmail(account.getEmail()) && isValidPhone(account.getPhone());
		}
	}
	
	public static boolean isValidPayment(Payment payment, Coupon cp) {
		
		if(payment == null) new IllegalArgumentException("파라미터가  존재하지 않습니다.");
		
		if(payment.getDepositor() == null || "".equals(payment.getDepositor())) {
			new IllegalArgumentException("입금자명이 없습니다.");
		}
		
		boolean isUseCoupon = cp != null;
		
		PaymentServiceType serviceType = PaymentServiceType.getType(payment.getServiceType());
		List<PaymentServiceSubtype> serviceSubtypes = new ArrayList<PaymentServiceSubtype>();
		
		String serviceSubtypeStr = payment.getServiceSubTypes();
		
		if(serviceSubtypeStr == null || "".equals(serviceSubtypeStr)) throw new IllegalArgumentException("serviceSubtype 값이 존재하지 않습니다.");
		String[] serviceSubtypeArr = StringUtils.splitByWholeSeparator(serviceSubtypeStr, ",");
		
		int serviceSubtypeLength = serviceSubtypeArr.length;
		
		for(int i=0; i<serviceSubtypeLength; i++) {
			serviceSubtypes.add(PaymentServiceSubtype.getType(serviceSubtypeArr[i]));
		}
		
		if(serviceType == PaymentServiceType.WITH_ALL) {
			if(serviceSubtypeLength > 1) throw new IllegalArgumentException("serviceSubtype 값이  유효하지 않습니다.");
			
			if(serviceSubtypes.get(0) != PaymentServiceSubtype.MONTH 
			&& serviceSubtypes.get(0) != PaymentServiceSubtype.YEAR) throw new IllegalArgumentException("serviceSubtype 값이  유효하지 않습니다.");
			
			if(serviceSubtypes.get(0) == PaymentServiceSubtype.MONTH) {
				if(isUseCoupon) {
					payment.setSum(discount(100000, cp));
				}
				else {
					payment.setSum(100000);
				}
			}
			else {
				if(isUseCoupon) {
					payment.setSum(discount(990000, cp));
				}
				else {
					payment.setSum(990000);
				}
			}
		}
		else {
			int sum = 0;
			
			for(PaymentServiceSubtype subType: serviceSubtypes) {
				switch(subType) {
				case TOOJA :
					sum += 50000;
					break;
				case GYEONG_GONG :
					sum += 50000;
					break;
				case MULGEON :
					sum += 50000;
					break;
				case HEAT_MAP :
					sum += 50000;
					break;
				}
			}
			
			if(isUseCoupon) {
				payment.setSum(discount(sum, cp));
			}
			else {
				payment.setSum(sum);
			}
		}

		return true;
	}
	
	private static int  discount(int seed, Coupon cp) {
		String discountUnit = cp.getDiscountUnit();
		String discountValue = cp.getDiscountValue();
		int discountValueInt = Integer.parseInt(discountValue);
		
		if("1".equals(discountUnit)) {
			return seed - (int)Math.round(100000 * (0.01 * discountValueInt));
		}
		else {
			return seed - discountValueInt;
		}
	}
}
