﻿using FluentValidation;

namespace jvContacts.Application.Contacts.Commands.UpdateContact
{
  public class UpdateContactCommandValidator : AbstractValidator<UpdateContactCommand>
  {
    public UpdateContactCommandValidator()
    {
      RuleFor(x => x.FirstName).MaximumLength(80).NotEmpty();
      RuleFor(x => x.LastName).MaximumLength(80).NotEmpty();
      RuleFor(x => x.Email).MaximumLength(255).NotEmpty().EmailAddress();
      RuleFor(x => x.PhoneNumber).MaximumLength(20);
      RuleFor(x => x.Street1).MaximumLength(80);
      RuleFor(x => x.Street2).MaximumLength(80);
      RuleFor(x => x.City).MaximumLength(80);
      RuleFor(x => x.State).MaximumLength(80);
      RuleFor(x => x.Country).MaximumLength(80);
      RuleFor(x => x.ZipCode).MaximumLength(10);
      RuleFor(x => x.ImageUrl).MaximumLength(500);
    }
  }
}
